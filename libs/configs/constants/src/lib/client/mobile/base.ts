import { str, CleanedEnv } from 'envalid';

const base = {
  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: str({
    default: 'always',
    choices: ['always', 'dev', 'prod', 'never'],
    desc: "Only enable if we're catching errors in the right environment",
  }),

  /**
   * This feature is particularly useful in development mode, but
   * can be used in production as well if you prefer.
   */
  persistNavigation: str({
    default: 'never',
    choices: ['always', 'dev', 'prod', 'never'],
    desc: 'This feature is particularly useful in development mode, but can be used in production as well if you prefer.',
  }),
};

export type PersistNavigationConfig = CleanedEnv<Pick<typeof base, 'persistNavigation'>>['persistNavigation'];

/**
 * This is a list of all the route names that will exit the app if the
 * back button is pressed while in that screen. Only affects Android.
 */
export const EXIT_ROUTES = ['Welcome', 'Home'] as const;

export default base;
