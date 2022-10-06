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
