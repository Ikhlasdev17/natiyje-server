export interface IPaymentPrepareRequest {
	click_trans_id: number | bigint
	service_id: string
	click_paydoc_id: bigint | number
	merchant_trans_id: string
	amount: number
	action: number
	error: number
	error_note: string
	sign_time: string
	sign_string: string
}

export interface IPaymentPrepareResponse {
	click_trans_id: number | bigint
	merchant_prepare_id: number
	merchant_trans_id: string
	error: number
	error_note: string
}
