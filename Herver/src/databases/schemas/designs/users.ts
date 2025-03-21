import { DesignDocument } from "../../utils";

export const users = {
  _id: "_design/users",
  views: {
    docs: {
      map: function (doc) {
        if (doc.type === "user") {
          emit(doc);
        }
      },
    },
    "email-password": {
      map: function (doc) {
        if (doc.type === "user") {
          emit(doc.email, doc.password);
        }
      },
    },
    "email-tokens": {
      map: function (doc) {
        if (doc.type === "user") {
          emit(doc.email, doc.tokens);
        }
      },
    },
  },
} satisfies DesignDocument;
