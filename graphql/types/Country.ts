import {
  objectType,
  extendType,
  enumType,
  intArg,
  stringArg,
  nonNull,
  unionType,
} from "nexus";

export const Country = objectType({
  name: "Country",
  definition(t) {
    t.string("id");
    t.string("country");
    t.int("area");
    t.list.field("record", {
      type: CountryRecord,
      resolve(root, args, ctx) {
        return ctx.prisma.record?.findMany({
          where: {
            countryId: root.id,
          },
        });
      },
    });
  },
});

const CountryRecord = objectType({
  name: "CountryRecord",
  definition(t) {
    t.string("id");
    t.int("year");
    t.int("population");
    t.string("countryId");
  },
});

// export const Error = objectType({
//   name: "Error",
//   definition(t) {
//     t.string("error");
//   },
// });

// export const CountryResult = unionType({
//   name: "CountryResult",
//   resolveType(data) {
//     const __typename = "id" in data ? "Country" : "Error";
//     return __typename;
//   },
//   definition(t) {
//     t.members("Country", "Error");
//   },
// });

// //   export const UserEmailMutation = extendType({
// //     type: "Mutation",
// //     definition(t) {
// //       t.nonNull.field("updateEmail", {
// //         type: "User",
// //         args: {
// //           matric: nonNull(stringArg()),
// //           email: nonNull(stringArg()),
// //         },
// //         async resolve(_, args, ctx) {
// //           let queryResult;
// //           queryResult = await ctx.prisma.user.update({
// //             where: {
// //               matric: args.matric,
// //             },
// //             data: {
// //               email: args.email,
// //             },
// //           });
// //           return queryResult;
// //         },
// //       });
// //     },
// //   });

// //   export const UserPasswordMutation = extendType({
// //     type: "Mutation",
// //     definition(t) {
// //       t.nonNull.field("updatePassword", {
// //         type: "UserResult",
// //         args: {
// //           matric: nonNull(stringArg()),
// //           password: nonNull(stringArg()),
// //         },
// //         async resolve(_, args, ctx) {
// //           let queryResult;
// //           if (!ctx.userId)
// //             return {
// //               error: "You are unauthorized",
// //             };
// //           const user = await ctx.prisma.user.findUnique({
// //             where: {
// //               matric: args.matric,
// //             },
// //           });
// //           if (!user)
// //             return {
// //               error: "User not found",
// //             };
// //           if (user.id !== ctx.userId)
// //             return {
// //               error: "You are unauthorized to modify this user",
// //             };
// //           const hash = await argon2.hash(args.password);
// //           queryResult = await ctx.prisma.user.update({
// //             where: {
// //               matric: args.matric,
// //             },
// //             data: {
// //               password: hash,
// //             },
// //           });
// //           return queryResult;
// //         },
// //       });
// //     },
// //   });

// //   export const MatricVerifiedMutation = extendType({
// //     type: "Mutation",
// //     definition(t) {
// //       t.nonNull.field("updateMatricVerified", {
// //         type: "UserResult",
// //         args: {
// //           matric: nonNull(stringArg()),
// //         },
// //         async resolve(_, args, ctx) {
// //           let queryResult;
// //           if (!ctx.userId)
// //             return {
// //               error: "You are unauthorized",
// //             };
// //           const user = await ctx.prisma.user.findUnique({
// //             where: {
// //               matric: args.matric,
// //             },
// //           });
// //           if (!user)
// //             return {
// //               error: `User with matric ${args.matric} not found`,
// //             };
// //           if (user.id !== ctx.userId)
// //             return {
// //               error: "You are not authorized to modify this user",
// //             };
// //           queryResult = await ctx.prisma.user.update({
// //             where: {
// //               matric: args.matric,
// //             },
// //             data: {
// //               matricVerified: true,
// //             },
// //           });
// //           return queryResult;
// //         },
// //       });
// //     },
// //   });
// export const Response = objectType({
//   name: "Response",
//   definition(t) {
//     t.field("pageInfo", { type: PageInfo });
//     t.list.field("edges", {
//       type: Edge,
//     });
//   },
// });

// // export const CountryQuery = extendType({
// //   type: "Query",
// //   definition(t) {
// //     t.field("country", {
// //       type: "Country",
// //       args: {},
// //       async resolve(_, args, ctx) {
// //         let queryResult = null;
// //         if (args.matric) {
// //           queryResult = await ctx.prisma.user.findUnique({
// //             where: {
// //               matric: args.matric,
// //             },
// //           });
// //           let userId = ctx.userId;
// //           const result = {
// //             id: queryResult.id,
// //             email: queryResult.email,
// //             matric: queryResult.matric,
// //             matricVerified: queryResult.matricVerified,
// //             role: queryResult.role,
// //             password: queryResult.password,
// //           };
// //           return result;
// //         }
// //         if (args.email) {
// //           queryResult = await ctx.prisma.user.findFirst({
// //             where: {
// //               email: args.email,
// //             },
// //           });
// //           const result = {
// //             id: queryResult.id,
// //             email: queryResult.email,
// //             matric: queryResult.matric,
// //             matricVerified: queryResult.matricVerified,
// //             role: queryResult.role,
// //             password: queryResult.password,
// //           };
// //           return result;
// //         }
// //       },
// //     });
// //   },
// // });

// export const CountriesQuery = extendType({
//   type: "Query",
//   definition(t) {
//     t.field("countries", {
//       type: "Response",
//       args: {
//         first: intArg(),
//         after: stringArg(),
//       },
//       async resolve(_, args, ctx) {
//         let queryResults = null;

//         if (args.after) {
//           // check if there is a cursor as the argument
//           queryResults = await ctx.prisma.country.findMany({
//             take: args.first, // the number of items to return from the database
//             skip: 1, // skip the cursor
//             cursor: {
//               id: args.after, // the cursor
//             },
//           });
//         } else {
//           // if no cursor, this means that this is the first request
//           //  and we will return the first items in the database
//           queryResults = await ctx.prisma.country.findMany({
//             take: args.first,
//           });
//         }
//         // if the initial request returns links
//         if (queryResults.length > 0) {
//           // get last element in previous result set
//           const lastCountryInResults = queryResults[queryResults.length - 1];
//           // cursor we'll return in subsequent requests
//           const myCursor = lastCountryInResults.id;

//           // query after the cursor to check if we have nextPage
//           const secondQueryResults = await ctx.prisma.country.findMany({
//             take: args.first,
//             cursor: {
//               id: myCursor,
//             },
//             orderBy: {
//               country: "asc",
//             },
//           });
//           // return response
//           const result = {
//             pageInfo: {
//               endCursor: myCursor,
//               hasNextPage: secondQueryResults.length >= args.first, //if the number of items requested is greater than the response of the second query, we have another page
//             },
//             edges: queryResults.map((country) => ({
//               cursor: country.id,
//               node: country,
//             })),
//           };

//           return result;
//         }
//         //
//         return {
//           pageInfo: {
//             endCursor: null,
//             hasNextPage: false,
//           },
//           edges: [],
//         };
//       },
//     });
//   },
// });

// export const Edge = objectType({
//   name: "Edge",
//   definition(t) {
//     t.string("cursor");
//     t.field("node", {
//       type: Country,
//     });
//   },
// });

// export const PageInfo = objectType({
//   name: "PageInfo",
//   definition(t) {
//     t.string("endCursor");
//     t.boolean("hasNextPage");
//   },
// });

export const CountriesQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("countries", {
      type: "Country",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.country.findMany();
      },
    });
  },
});
