import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",
  // This path is corrected to look inside the `src` directory
  documents: "src/graphql/**/*.ts",
  generates: {
    // The output is also directed into the `src` folder for better organization
    "src/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
