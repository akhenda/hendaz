import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const roles = v.union(v.literal('admin'), v.literal('member'));
export const fileTypes = v.union(v.literal('image'), v.literal('csv'), v.literal('pdf'));

export default defineSchema({
  favorites: defineTable({
    fileId: v.id('files'),
    orgId: v.string(),
    userId: v.id('users'),
  }).index('by_userId_orgId_fileId', ['userId', 'orgId', 'fileId']),

  files: defineTable({
    fileId: v.id('_storage'),
    name: v.string(),
    orgId: v.string(),
    shouldDelete: v.optional(v.boolean()),
    type: fileTypes,
    userId: v.id('users'),
  })
    .index('by_orgId', ['orgId'])
    .index('by_shouldDelete', ['shouldDelete']),

  users: defineTable({
    image: v.optional(v.string()),
    name: v.optional(v.string()),
    orgIds: v.array(v.object({ orgId: v.string(), role: roles })),
    tokenIdentifier: v.string(),
  }).index('by_tokenIdentifier', ['tokenIdentifier']),
});
