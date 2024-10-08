module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init', // Initialize some changes
        'build', // Changes that affect the build system or external dependencies
        'update', // Changes that exist and update the code  or corrects existing code
        'docs', // Documentation only changes
        'feat', // A new feature
        'fix', // A bug fix
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'revert', // Revert a commit
        'style', // Changes that do not affect the meaning of the code
        'test', // Adding missing tests
        'qa', // QA
        'delete', // Delete a file
      ],
    ],
  },
};
