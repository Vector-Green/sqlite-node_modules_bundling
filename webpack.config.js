const path = require("path");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {
  return new Promise((resolve) => {
    resolve();
  }).then(() => {
    return {
      stats: "minimal",
      target: "node",
      externals: undefined, //I don't need node-externals

      mode: process.env.NODE_ENV,
      entry: ["./src/index.js"],
      devtool: false,
      output: {
        clean: true,
        hashFunction: "xxhash64",
        hashDigest: "base64url",
        path: path.resolve(__dirname, "dist"),
        filename: "server.js",
        chunkFilename: "[contenthash].js",
      },
      resolve: {
        extensions: [
          ".tsx",
          ".ts",
          ".cjs",
          ".mjs",
          ".js",
          ".jsx",
          ".json",
          ".wasm",
        ],
      },
      module: {
        rules: [
          {
            test: /.node$/,
            loader: "node-loader",
            options: {
              name: "[name].[ext]",
            },
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: false,
                  cacheCompression: true,
                  compact: true,
                },
              },
            ],
          },
        ],
      },

      optimization: {
        chunkIds: "total-size",
        concatenateModules: true,
        emitOnErrors: false,
        flagIncludedChunks: true,
        innerGraph: true,
        mangleExports: "size",
        mangleWasmImports: true,
        mergeDuplicateChunks: true,
        minimize: true,

        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            include: undefined,
            exclude: undefined,
            parallel: true,
            minify: TerserPlugin.terserMinify,

            terserOptions: {
              compress: {
                arguments: true,
                arrows: true,
                booleans_as_integers: false, //! unsafe for discord //! unsafe for nest
                booleans: true,
                collapse_vars: true,
                comparisons: true,
                computed_props: true,
                conditionals: true,
                dead_code: true,
                defaults: true,
                directives: true,
                drop_console: false, //?
                drop_debugger: true,
                ecma: 2020,
                evaluate: true,
                expression: true,
                global_defs: {},
                hoist_funs: true,
                hoist_props: true,
                hoist_vars: true,
                ie8: false,
                if_return: true,
                inline: true,
                join_vars: true,
                keep_classnames: false, //! unsafe for discord
                keep_fargs: false,
                keep_fnames: false,
                keep_infinity: false,
                loops: true,
                module: true,
                negate_iife: true,
                passes: 100,
                properties: true,
                pure_funcs: [],
                pure_getters: "strict",
                reduce_vars: true,
                reduce_funcs: true,
                sequences: true,
                side_effects: true,
                switches: true,
                toplevel: true,
                top_retain: null,
                typeofs: true,

                unsafe_arrows: false, //!unsafe for nest
                unsafe: true, //! unsafe for discord

                unsafe_comps: true,
                unsafe_Function: true,
                unsafe_math: true,
                unsafe_symbols: true,

                unsafe_methods: true,
                unsafe_proto: true,
                unsafe_regexp: true,
                unsafe_undefined: true,

                unused: true,
              },
              ecma: 2020,
              enclose: false,
              ie8: false,
              keep_classnames: false, //!unsafe for discord
              keep_fnames: false,
              mangle: {
                eval: true,
                keep_classnames: false, //!unsafe for discord
                keep_fnames: false,
                module: true,
                safari10: false,
                toplevel: true,
              },
              module: true,
              nameCache: undefined,
              format: {
                ascii_only: false,
                beautify: false,
                braces: false,
                comments: false,
                ecma: 2020,
                ie8: false,
                keep_numbers: false,
                indent_level: 0,
                indent_start: 0,
                inline_script: true,
                keep_quoted_props: false,
                max_line_len: false,
                preamble: undefined,
                preserve_annotations: false,
                quote_keys: false,
                quote_style: 0,
                safari10: false,
                semicolons: true,
                shebang: true,
                webkit: false,
                wrap_iife: false,
                wrap_func_args: true,
              },
              parse: {
                bare_returns: true,
                html5_comments: false,
                shebang: true,
              },
              safari10: false,
              sourceMap: false,
              toplevel: true,
            },
            extractComments: false,
          }),
        ],
        moduleIds: "size",
        portableRecords: true,
        providedExports: true,
        realContentHash: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        runtimeChunk: false,
        sideEffects: true,
        splitChunks: false,
        usedExports: true,
      },
    };
  });
};
