type SignUpSuccessResponse = {
    "message": "success",
    "user": {
        "_id": string,
        "firstName": string,
        "lastName": string,
        "email": string,
        "gender": "male" | "female",
        "phone": string,
        "photo": string,
        "role": string,
        "wishlist": string[],
        "addresses": string[],
        "createdAt": string
    },
    "token": string
}

type SignUpErrorResponse = {
  error: string
}

export type SignUpResponse = SignUpSuccessResponse | SignUpErrorResponse;