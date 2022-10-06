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

export const CreateRecordMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createRecord", {
      type: "Record",
      args: {
        countryId: nonNull(stringArg()),
        year: nonNull(intArg()),
        population: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        let queryResult;
        queryResult = await ctx.prisma.record.create({
          data: {
            countryId: args.countryId,
            year: args.year,
            population: args.population,
          },
        });
        return queryResult;
      },
    });
  },
});

export const UpdateRecordMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateRecord", {
      type: "Record",
      args: {
        id: nonNull(stringArg()),
        countryId: nullable(stringArg()),
        year: nullable(intArg()),
        population: nullable(intArg()),
      },
      async resolve(
        _,
        args: {
          countryId: string;
          year: number;
          population: number;
          id: string;
        },
        ctx
      ) {
        let queryResult;
        queryResult = await ctx.prisma.record.update({
          where: {
            id: args.id,
          },
          data: {
            countryId: args.countryId,
            year: args.year,
            population: args.population,
          },
        });
        return queryResult;
      },
    });
  },
});

export const DeleteRecordMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteRecord", {
      type: "Record",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        let queryResult;
        queryResult = await ctx.prisma.record.delete({
          where: {
            id,
          },
        });
        return { ...queryResult, message: "Deleted successfully" };
      },
    });
  },
});
