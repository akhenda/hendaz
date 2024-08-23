import { ConvexError, v } from 'convex/values';

import { internalMutation, MutationCtx, query, QueryCtx } from './_generated/server';
import { roles } from './schema';

export async function getUser(ctx: QueryCtx | MutationCtx, tokenIdentifier: string) {
  const user = await ctx.db
    .query('users')
    .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', tokenIdentifier))
    .first();

  if (!user) throw new ConvexError('Expected user to be defined');

  return user;
}

export const createUser = internalMutation({
  args: { image: v.string(), name: v.string(), tokenIdentifier: v.string() },
  async handler(ctx, args) {
    await ctx.db.insert('users', {
      image: args.image,
      name: args.name,
      orgIds: [],
      tokenIdentifier: args.tokenIdentifier,
    });
  },
});

export const updateUser = internalMutation({
  args: { image: v.string(), name: v.string(), tokenIdentifier: v.string() },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, { image: args.image, name: args.name });
  },
});

export const addOrgIdToUser = internalMutation({
  args: { orgId: v.string(), role: roles, tokenIdentifier: v.string() },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      orgIds: [...user.orgIds, { orgId: args.orgId, role: args.role }],
    });
  },
});

export const updateRoleInOrgForUser = internalMutation({
  args: { orgId: v.string(), role: roles, tokenIdentifier: v.string() },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);
    const org = user.orgIds.find((_org) => _org.orgId === args.orgId);

    if (!org) {
      throw new ConvexError('expected an org on the user but was not found when updating');
    }

    org.role = args.role;

    await ctx.db.patch(user._id, { orgIds: user.orgIds });
  },
});

export const getUserProfile = query({
  args: { userId: v.id('users') },
  async handler(ctx, args) {
    const user = await ctx.db.get(args.userId);

    return { image: user?.image, name: user?.name };
  },
});

export const getMe = query({
  args: {},
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    const user = await getUser(ctx, identity.tokenIdentifier);

    return user;
  },
});
