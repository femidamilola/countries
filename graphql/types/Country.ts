import {
  objectType,
  extendType,
  enumType,
  intArg,
  stringArg,
  nonNull,
  unionType,
  nullable,
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

export const CreateCountryMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCountry", {
      type: "Country",
      args: {
        country: nonNull(stringArg()),
        area: nonNull(intArg()),
      },
      async resolve(_, { country, area }, ctx) {
        let queryResult;
        queryResult = await ctx.prisma.country.create({
          data: {
            country,
            area,
          },
        });
        return queryResult;
      },
    });
  },
});

export const UpdateCountryMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateCountry", {
      type: "Country",
      args: {
        id: nonNull(stringArg()),
        country: nullable(stringArg()),
        area: nullable(intArg()),
      },
      async resolve(_, { area, country, id }, ctx) {
        let queryResult;
        queryResult = await ctx.prisma.country.update({
          where: {
            id,
          },
          data: {
            country,
            area,
          },
        });
        return queryResult;
      },
    });
  },
});

export const DeleteCountryMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteCountry", {
      type: "Country",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        let queryResult;
        queryResult = await ctx.prisma.country.delete({
          where: {
            id,
          },
        });
        return { ...queryResult, message: "Deleted successfully" };
      },
    });
  },
});
