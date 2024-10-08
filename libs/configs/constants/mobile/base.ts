export interface BaseConfig {
  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: 'always' | 'dev' | 'prod' | 'never';

  /**
   * This is a list of all the route names that will exit the app if the
   * back button is pressed while in that screen. Only affects Android.
   */
  exitRoutes: string[];

  /**
   * This feature is particularly useful in development mode, but
   * can be used in production as well if you prefer.
   */
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';
}

const base: BaseConfig = {
  catchErrors: 'always',
  exitRoutes: ['Welcome', 'Home'],
  persistNavigation: 'never',
};

export default base;
