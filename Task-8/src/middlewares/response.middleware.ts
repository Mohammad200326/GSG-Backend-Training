import { ErrorStatusCode } from "../utils/util.types";
import { RequestHandler } from "express";

export type UnifiedAPIErrorResponse = {
  statusCode: ErrorStatusCode;
  message: string;
};

export type SuccessAPIResponse = {
  success: true;
  data: object;
};

export type UnsuccessfulAPIResponse = {
  success: false;
  error: UnifiedAPIErrorResponse;
};

export type UnifiedAPIResponse = SuccessAPIResponse | UnsuccessfulAPIResponse;

export const responseEnhancer: RequestHandler = (req, res, next) => {
  res.ok = (data) => {
    return res.status(200).json(formatUnifiedResponse({ success: true, data }));
  };

  res.create = (data) => {
    return res.status(201).json(formatUnifiedResponse({ success: true, data }));
  };

  res.error = (error) => {
    return res
      .status(error.statusCode)
      .json(formatUnifiedResponse({ success: false, error }));
  };

  next();
};

const formatUnifiedResponse = (res: UnifiedAPIResponse) => res;
