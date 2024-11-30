import { Request, Router, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

router.route("/").get(
  asyncHandler(async (req: Request, res: Response) => {
    const ip = req.ip
    console.log(req.ip);
    console.log(req.clientIp);
    

    return res
      .status(200)
      .json(new ApiResponse(200, "OK", "Default route working successfully", ));
  })
);

export default router;
