import { Request, Response, NextFunction } from "express";
import { mockCreateTaskDto, mockUpdateTaskDto } from "../domains/task";

const INVALID_PAYLOAD_MESSAGE =
  "Invalid payload, please check the data structure.";
const INVALID_PAYLOAD_HTTP_RESPONSE_NUMBER = 400;

export const taskPayloadValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const httpMethod = req.method;
  const payload = req.body;

  switch (httpMethod) {
    case "POST":
      const isPostPayloadValid = checkPayload(payload, mockCreateTaskDto);
      if (!isPostPayloadValid) return sendReturnMessage(res);
      break;

    case "PATCH":
      const isPatchPayloadValid = checkPayload(payload, mockUpdateTaskDto);
      if (!isPatchPayloadValid) return sendReturnMessage(res);
      break;

    case "GET":
      const isGetPayloadValid = checkPayload(payload, {} as any);
      if (!isGetPayloadValid) return sendReturnMessage(res);
      break;

    case "DELETE":
      const isDeletePayloadValid = checkPayload(payload, {} as any);
      if (!isDeletePayloadValid) return sendReturnMessage(res);
      break;
    default:
      break;
  }

  next();
};

const checkPayload = (payload: any, structure: any): boolean => {
  const payloadKey = Object.keys(payload);
  const structureKeys = Object.keys(structure);

  if (!payloadKey) return false;

  const isValid = payloadKey.every((prop) => structureKeys.includes(prop))
  return isValid;
};

const sendReturnMessage = (res: Response) => {
  return res
    .status(INVALID_PAYLOAD_HTTP_RESPONSE_NUMBER)
    .send(INVALID_PAYLOAD_MESSAGE);
};
