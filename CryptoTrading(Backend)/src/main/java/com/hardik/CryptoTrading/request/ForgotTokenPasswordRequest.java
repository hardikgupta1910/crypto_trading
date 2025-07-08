package com.hardik.CryptoTrading.request;

import com.hardik.CryptoTrading.domain.VerificationType;
import lombok.Data;

@Data
public class ForgotTokenPasswordRequest {
	private String sendTo;
	private VerificationType verificationType;
}
