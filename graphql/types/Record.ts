import {
  objectType,
  extendType,
  enumType,
  intArg,
  stringArg,
  nonNull,
  unionType,
} from "nexus";

export const RecordCountry = objectType({
  name: "RecordCountry",
  definition(t) {
    t.string("id");
    t.string("country");
    t.int("area");
    t.list.field("record", {
      type: Record,
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

const Record = objectType({
  name: "Record",
  definition(t) {
    t.string("id");
    t.int("year");
    t.int("population");
    t.string("countryId");
    t.field("country", {
      type: "String",
      async resolve(root, args, ctx) {
        const c = await ctx.prisma.country?.findUnique({
          where: {
            id: root.countryId,
          },
        });
        return c.country;
      },
    });
    t.field("area", {
      type: "Int",
      async resolve(root, args, ctx) {
        const c = await ctx.prisma.country?.findUnique({
          where: {
            id: root.countryId,
          },
        });
        return c.area;
      },
    });
  },
});

export const RecordsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("records", {
      type: "Record",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.record.findMany();
      },
    });
  },
});
