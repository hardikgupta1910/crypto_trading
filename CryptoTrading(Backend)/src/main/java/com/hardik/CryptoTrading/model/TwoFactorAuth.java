package com.hardik.CryptoTrading.model;

import com.hardik.CryptoTrading.domain.VerificationType;
import lombok.Data;

@Data
public class TwoFactorAuth {
	private boolean isEnabled=false;
	private VerificationType sendTo;
}
