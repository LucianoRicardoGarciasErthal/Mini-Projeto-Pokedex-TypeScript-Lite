// Erro lançado quando a PokeAPI retorna falha
export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}

// Erro lançado em operações inválidas no catálogo local
export class LocalBoxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocalBoxError";
  }
}
