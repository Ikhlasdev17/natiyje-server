export interface ClickCreateInvoiceResponseType {
	error_code: number
	error_note: string
	invoice_id: number
	eps_id: string
}

export interface ClickCreateInvoiceRequestType {
	merchant_trans_id: number
	service_id: number
	amount: number
	phone_number: string
}

export interface ClickCheckInvoiceResponseType {
	error_code: number
	error_note: string
	status: number
	status_note: string
	payment_id: null
}
