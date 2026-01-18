import { Translations } from "../types/global";
import z from "zod";



export const emailSchema = (t: Translations) => {
    return z.object({
        email: z.email({
        error: (issue) =>
          issue.input === "" ? t("email-required") : t("email-invalid"),
      }),
    })

}
