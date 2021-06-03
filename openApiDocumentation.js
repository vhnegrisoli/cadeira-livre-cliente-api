module.exports = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Cadeira Livre Cliente API",
    description: "API do cliente do app SalonB",
    license: {
      name: "MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:8096/",
      description: "API local",
    },
    {
      url: "https://cadeira-livre-cliente-api.herokuapp.com/",
      description: "API produção",
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: "Usuário",
      name: "Autenticação",
      name: "Cadeira Livre",
      name: "Empresa",
      name: "Pagamento",
    },
  ],
  paths: {
    "/users": {
      get: {
        tags: ["Usuário"],
        description: "Get users",
        operationId: "getUsers",
        parameters: [
          {
            name: "x-company-id",
            in: "header",
            schema: {
              $ref: "#/components/schemas/companyId",
            },
            required: true,
            description: "Company id where the users work",
          },
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              default: 1,
            },
            required: false,
          },
          {
            name: "orderBy",
            in: "query",
            schema: {
              type: "string",
              enum: ["asc", "desc"],
              default: "asc",
            },
            required: false,
          },
        ],
        responses: {
          200: {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Users",
                },
              },
            },
          },
          400: {
            description: "Missing parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "companyId is missing",
                  internal_code: "missing_parameters",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Usuário"],
        description: "Create users",
        operationId: "createUsers",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Users",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "New users were created",
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "User identificationNumbers 10, 20 already exist",
                  internal_code: "invalid_parameters",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      identificationNumber: {
        type: "integer",
        description: "User identification number",
        example: 1234,
      },
      username: {
        type: "string",
        example: "raparicio",
      },
      userType: {
        type: "string",
      },
      companyId: {
        type: "integer",
        description: "Company id where the user works",
        example: 15,
      },
      User: {
        type: "object",
        properties: {
          identificationNumber: {
            $ref: "#/components/schemas/identificationNumber",
          },
          username: {
            $ref: "#/components/schemas/username",
          },
          userType: {
            $ref: "#/components/schemas/userType",
          },
          companyId: {
            $ref: "#/components/schemas/companyId",
          },
        },
      },
      Users: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          internal_code: {
            type: "string",
          },
        },
      },
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
  },
};
