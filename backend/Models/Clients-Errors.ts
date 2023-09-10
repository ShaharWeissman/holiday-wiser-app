import StatusCode from "./status-code";

// {404, "page not found"}
abstract class ClientError {
  constructor(public status: number, public message: string) {
  }
}

export class UnauthorizedError extends ClientError {
  constructor(message: any){
 super(StatusCode.Unauthorized, message);
  }
}

export class ValidationError extends ClientError {
  constructor(message: string){
 super(StatusCode.BadRequest, message);
  }
}

export class ForbiddenError extends ClientError {
  constructor(message: string){
    super (StatusCode.Forbidden, message);}
  }

  export class ResourceNotFoundError extends ClientError {
    constructor(id: number) {
        super(StatusCode.NotFound, `there is no id ${id} .`);
    }
}

//"child" client error class
export class RouteNotFound extends ClientError {
  constructor(route: string) {
    // super(404, `route ${route} was not found`);
    super(StatusCode.NotFound, `route ${route} was not found`);

  }
}
