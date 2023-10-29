export const SmsBaseURL = `https://notify.eskiz.uz`

export const getSmsAuthURL = (url: string) => SmsBaseURL + `/api/auth/${url}`
export const getSmsMessageURL = (url: string) =>
	SmsBaseURL + `/api/message/${url}`
