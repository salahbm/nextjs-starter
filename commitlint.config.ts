module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init', // Initial commit/first commit
        'build', // Changes that affect the build system or external dependencies
        'chore', // Changes to the build process or auxiliary tools
        'ci', // Changes to our CI configuration files and scripts
        'docs', // Documentation only changes
        'feat', // A new feature
        'fix', // A bug fix
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'revert', // Revert a commit
        'style', // Changes that do not affect the meaning of the code
        'test', // Adding missing tests
        'wip', // Work in progress
        'qa', // QA
      ],
    ],
  },
};
