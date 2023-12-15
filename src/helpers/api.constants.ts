export const SmsBaseURL = `https://notify.eskiz.uz`
export const ClickBaseUrl = `https://api.click.uz/v2`

export const getSmsAuthURL = (url: string) => SmsBaseURL + `/api/auth/${url}`
export const getSmsMessageURL = (url: string) =>
	SmsBaseURL + `/api/message/${url}`
export const getClickBaseUrl = (url: string) => ClickBaseUrl + `/${url}`
