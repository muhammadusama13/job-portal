export const ValidatorError = (errorArray) => {
    // const err = error?.response?.data?.error?.detail
    let result = {}

    errorArray?.map((item) => {
        result = {
            ...result,
            [item?.split(" ")[0]]: item
        }
    })

    return result

}