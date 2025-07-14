package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.domain.PaymentMethod;
import com.hardik.CryptoTrading.domain.PaymentOrderStatus;
import com.hardik.CryptoTrading.model.PaymentOrder;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.repository.PaymentOrderRepository;
import com.hardik.CryptoTrading.response.PaymentResponse;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentOrderServiceImpl implements PaymentService {
	
	@Autowired
	private PaymentOrderRepository paymentOrderRepository;
	
	@Value("${stripe.api.key}")
	private String stripeSecretKey;
	
	@Value("${razorpay.api.key}")
	private String apiKey;
	
	@Value(("${razorpay.api.secret}"))
	private String apiSecretKey;
	
	@Override
	public PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod) {
		
		PaymentOrder paymentOrder = new PaymentOrder();
		paymentOrder.setUser(user);
		paymentOrder.setAmount(amount);
		paymentOrder.setPaymentMethod(paymentMethod);
		paymentOrder.setStatus(PaymentOrderStatus.PENDING);
		
		return paymentOrderRepository.save(paymentOrder);
		
	}
	
	@Override
	public PaymentOrder getPaymentOrderById(Long id) throws Exception {
		return paymentOrderRepository.findById(id).orElseThrow(() -> new Exception("payment order not found"));
	}
	
	@Override
	public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException {
		
		if (paymentOrder.getStatus() == null) {
			
			paymentOrder.setStatus(PaymentOrderStatus.PENDING);
		}
		
		if (paymentOrder.getStatus().equals(PaymentMethod.RAZORPAY)) {
			if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
				
				RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecretKey);
				Payment payment = razorpay.payments.fetch(paymentId);
				
				Integer amount = payment.get("amount");
				String status = payment.get("status");
				
				if (status.equals("captured")) {
					paymentOrder.setStatus((PaymentOrderStatus.SUCCESS));
					return true;
				}
				paymentOrder.setStatus(PaymentOrderStatus.FAILED);
				paymentOrderRepository.save(paymentOrder);
				return false;
			}
			paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
			paymentOrderRepository.save(paymentOrder);
			return true;
		}
		
		return false;
	}
	
	@Override
	public PaymentResponse createRazorPaymentLink(User user, Long amount, Long orderId) throws RazorpayException {

		Long Amount=amount*100;
		try{
			RazorpayClient razorpay=new RazorpayClient(apiKey,apiSecretKey);

			JSONObject paymentLinkRequest=new JSONObject();
			paymentLinkRequest.put("amount", Amount);
			paymentLinkRequest.put("currency", "INR");

			JSONObject customer=new JSONObject();
			customer.put("name", user.getFullName());

			customer.put("email", user.getEmail());
			paymentLinkRequest.put("customer", customer);

			JSONObject notify=new JSONObject();
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);

			paymentLinkRequest.put("reminder_enable", true);


			paymentLinkRequest.put("callback_url","http://localhost:5173/wallet?order_id=" + orderId);
			paymentLinkRequest.put("callback_method", "get");

			PaymentLink payment= razorpay.paymentLink.create(paymentLinkRequest);

			String paymentLinkId=payment.get("id");
			String paymentLinkUrl=payment.get("short_url");

			PaymentResponse res = new PaymentResponse();
			res.setPaymentUrl(paymentLinkUrl);

			return res;

		}catch (RazorpayException e){
			System.out.println("Error creating payment link: "+ e.getMessage());

			throw new RazorpayException(e.getMessage());

		}
		
		
		
	}
	
	@Override
	public PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
		
		SessionCreateParams params = SessionCreateParams.builder()
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl("http://localhost:5173/wallet?order_id=" + orderId)
				.setCancelUrl("http://localhost:5173/payment/cancel")
				.addLineItem(
						SessionCreateParams.LineItem.builder()
								.setQuantity(1L)
								.setPriceData(
										SessionCreateParams.LineItem.PriceData.builder()
												.setCurrency("usd")
												.setUnitAmount(amount * 100L) // Stripe uses amount in cents
												.setProductData(
														SessionCreateParams.LineItem.PriceData.ProductData.builder()
																.setName("Top up wallet")
																.build()
												)
												.build()
								)
								.build()
				)
				.build();
		
		Session session = Session.create(params);
		System.out.println("session = " + session.getUrl());
		
		PaymentResponse res = new PaymentResponse();
		res.setPaymentUrl(session.getUrl());
		
		
		return res;
	}
}
