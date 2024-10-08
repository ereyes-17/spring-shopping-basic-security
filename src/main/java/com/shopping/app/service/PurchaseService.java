package com.shopping.app.service;

import com.shopping.app.model.Purchase;
import com.shopping.app.repository.projection.PurchaseItem;

import java.util.List;

public interface PurchaseService {
    Purchase savePurchase(Purchase purchase);
    List<PurchaseItem> findAllPurchasesOfUser(Long userId);
}
