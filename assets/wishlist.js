(function () {
  const wishlist_popup = document.getElementById("popup-wishlist");
  const {
    customerId,
    customerName,
    shopDomain,
    customerWishlist,
    shopLocale,
    langPrimary,
  } = document.querySelector(".wishlist-embed").dataset;
  let wishlistItemsAdded = JSON.parse(localStorage.getItem("wishlistItems"));
  let wishlistShareUrl = document.querySelector(
    ".wishlist-share-url-container"
  );
  let wishlistShareUrlInput = document.querySelector(
    ".wishlist-share-url > input"
  );
  let btnWishlistShare = document.querySelector(".wishlist-share-url > button");
  let shareUrlDisplayState = 0;
  let hDisplayShareLinkTime = 0;

  let wishlistItemHtmlCache = {};

  const handleWishlistSave = async () => {
    document.querySelector(".btn-wishlist-save").classList.add("pending");
    const rawResponse = await fetch(
      "https://wishlist-emperor--development.gadget.app/saveWishlist",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productIds: wishlistItemsAdded,
          customerId,
          shopDomain,
        }),
      }
    );
    document.querySelector(".btn-wishlist-save").classList.remove("pending");
    if (rawResponse.ok) {
      const actionFeedback = document.querySelector(
        ".save-into-account .action-feedback_success"
      );
      // actionFeedback.innerHTML = "Successfully saved wishlist items to account.";
      actionFeedback.style.display = "inline";
      actionFeedback.style.opacity = "1";
      setTimeout(() => {
        // actionFeedback.style.opacity = "0";
        actionFeedback.style.display = "none";
      }, 3000);
    } else {
      const actionFeedback = document.querySelector(
        ".save-into-account .action-feedback_fail"
      );
      // actionFeedback.innerHTML = "Something went wrong.";
      actionFeedback.style.display = "inline";
      // actionFeedback.style.opacity = "1";
      setTimeout(() => {
        // actionFeedback.style.opacity = "0";
        actionFeedback.style.display = "none";
      }, 3000);
    }
  };

  const handleWishlistShare = () => {
    const wishlistContent = {
      items: wishlistItemsAdded,
      name: customerName,
    };

    if (wishlistShareUrlInput && shareUrlDisplayState == 0) {
      shareUrlDisplayState = 1;
      wishlistShareUrl.style.display = "block";
      hDisplayShareLinkTime = setInterval(() => {
        wishlistShareUrl.style.display = "none";
        shareUrlDisplayState = 0;
        clearInterval(hDisplayShareLinkTime);
        hDisplayShareLinkTime = 0;
      }, 10000);
      wishlistShareUrlInput.value = `https://${window.location.hostname}/${
        langPrimary === "true" ? "" : `${shopLocale}/`
      }?shared_wishlist=${btoa(JSON.stringify(wishlistContent))}`;
    } else if (shareUrlDisplayState == 1) {
      clearInterval(hDisplayShareLinkTime);
      hDisplayShareLinkTime = 0;
      wishlistShareUrl.style.display = "none";
      shareUrlDisplayState = 0;
    }
    // window
    //   .open(
    //     `https://${window.location.hostname}/${langPrimary === "true" ? "" : `${shopLocale}/`}?shared_wishlist=${btoa(JSON.stringify(wishlistContent))}`,
    //     "_blank"
    //   )
    //   .focus();
  };

  if (btnWishlistShare) {
    btnWishlistShare.addEventListener("click", () => {
      navigator.clipboard
        .writeText(wishlistShareUrlInput.value)
        .then(() => {
          btnWishlistShare.innerHTML = "Copied to Clipboard";
          shareUrlDisplayState = 0;
          clearInterval(hDisplayShareLinkTime);
          hDisplayShareLinkTime = 0;
          let hTime = setInterval(() => {
            wishlistShareUrl.style.display = "none";
            btnWishlistShare.innerHTML = "Copy to Clipboard";
            clearInterval(hTime);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  const handlePopupClose = function () {
    Array.from(document.querySelectorAll(".popup-wishlist .close")).forEach(
      function (el) {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          e.target.closest(".popup-wishlist").classList.remove("shown");
        });
      }
    );
  };

  const toggleProduct = function (productId) {
    // Add or remove the product from the compare list (localStorage)
    wishlistItemsAdded = wishlistItemsAdded ? wishlistItemsAdded : [];
    if (wishlistItemsAdded.includes(productId)) {
      wishlistItemsAdded = wishlistItemsAdded.filter((e) => e !== productId);
      updateWishlistButtons(productId, false);
    } else {
      wishlistItemsAdded.push(productId);
      updateWishlistButtons(productId, true);
    }
    newData = JSON.stringify(wishlistItemsAdded);
    localStorage.setItem("wishlistItems", newData);
  };

  const updateWishlistButtons = function (productId, added) {
    // When a product is added or removed from the compare list, update all checkboxes on the page that belong to this product.
    Array.from(
      document.querySelectorAll(
        '.wishlist-productcard[data-product-id="' + productId + '"]'
      )
    ).forEach(function (el) {
      if (added) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    updateWishlistContent();
  };

  const showWishlistButtons = function () {
    const wishlistTrigger = document.querySelector(".wishlist-header");
    if (wishlistTrigger) {
      wishlistTrigger.classList.remove("hidden");
      wishlistTrigger.addEventListener("click", function (e) {
        e.preventDefault();
        const wishlistPopup = document.querySelector("#popup-wishlist");
        if (wishlistPopup) {
          displayWishlistItems();
          wishlistPopup.classList.add("shown");
        }
      });
    }
    const wishlistBtns = document.querySelectorAll(
      ".wishlist-productpage,  .wishlist-productcard"
    );
    if (wishlistBtns?.length) {
      for (const wishlistButton of wishlistBtns) {
        wishlistButton.classList.remove("hidden");
        wishlistButton.addEventListener("click", function (e) {
          console.log(wishlistButton.dataset.productId);
          toggleProduct(wishlistButton.dataset.productId);
        });
      }
    }

    const saveButton = document.querySelector(".btn-wishlist-save");
    if (saveButton) {
      saveButton.addEventListener("click", handleWishlistSave);
    }

    const shareButton = document.querySelector(".btn-wishlist-share");
    if (shareButton) {
      shareButton.addEventListener("click", handleWishlistShare);
    }
  };

  const loadWishlist = function () {
    wishlistItemsAdded = wishlistItemsAdded ? wishlistItemsAdded : [];
    if (customerWishlist) {
      const customerWishlistItems = customerWishlist.split(",");
      for (const customerWishlistItem of customerWishlistItems) {
        if (!wishlistItemsAdded.includes(customerWishlistItem)) {
          wishlistItemsAdded.push(customerWishlistItem);
        }
      }
    }
    if (wishlistItemsAdded?.length) {
      for (const item of wishlistItemsAdded) {
        updateWishlistButtons(item, true);
      }
    }

    updateWishlistContent();
  };

  const handleRemoveButtons = function () {
    Array.from(document.querySelectorAll("#popup-wishlist .remove")).forEach(
      function (el) {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          toggleProduct(el.dataset.productId);
        });
      }
    );
  };
  const displayWishlistItems = () => {
    let result;
    let popupWishlistHtml = "";
    for (const item of wishlistItemsAdded) {
      result = wishlistItemHtmlCache[item];
      if (result) {
        const url = `${
          langPrimary === "true" ? "" : `/${shopLocale}`
        }/products/${result.data.product.handle}`;
        let priceInDollar = parseFloat(
          result.data.product.priceRange.minVariantPrice.amount
        );
        const price = Shopify.formatMoney(priceInDollar * 100);
        const productItemHtml = `<div class="product-wishlist-item">
                                    <a href="${url}">
                                    <picture class="product-image img-multiply-bg">
                                      <img src="${
                                        result.data.product.featuredImage.url
                                      }" alt="product image">
                                    </picture>
                                    </a>
                                    <a href="${url}">
                                    <div class="ff-primary product-title">${
                                      result.data.product.title
                                    }</div>
                                    </a>
                                    <div class="ff-primary product-price">${price}</div>
                                    <a href="#" class="remove" data-product-id="${result.data.product.id.replace(
                                      "gid://shopify/Product/",
                                      ""
                                    )}">
                                    <i aria-hidden="true" class="icon-x-circle"></i>
                                    <span class="hidden">Remove</span>
                                    </a>
                                  </div>`;
        popupWishlistHtml = `${popupWishlistHtml}${productItemHtml}`;
      }
    }
    document.querySelector("#popup-wishlist .products-wrapper").innerHTML =
      popupWishlistHtml;
    handleRemoveButtons();
  };
  const updateWishlistContent = async function () {
    // var popupWishlistHtml = "",
    // itemsDone = 0;
    if (!wishlistItemsAdded?.length) {
      wishlist_popup.classList.add("empty");
    } else {
      wishlist_popup.classList.remove("empty");
      for (const item of wishlistItemsAdded) {
        let result;
        if (!wishlistItemHtmlCache[item]) {
          const response = await fetch(
            "https://wishlist-test-220.myshopify.com/api/2024-01/graphql.json",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token":
                  "4db011664ff37eff23fa26d405bef52a",
              },
              body: JSON.stringify({
                query: `query productDetails @inContext(language: ${shopLocale.toUpperCase()}) {
                product(id: "gid://shopify/Product/${item}") {
                  id
                  title
                  handle
                  featuredImage {
                    url
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                }
              }`,
              }),
            }
          );
          result = await response.json();
          wishlistItemHtmlCache[item] = result;
        }

        // const result = await response.json();

        // console.log(result);

        // const url = `${langPrimary === "true" ? "" : `/${shopLocale}`}/products/${result.data.product.handle}`;

        // const productItemHtml = `<div class="product-wishlist-item">
        //                             <a href="${url}">
        //                             <picture class="product-image img-multiply-bg">
        //                               <img src="${result.data.product.featuredImage.url}" alt="product image">
        //                             </picture>
        //                             </a>
        //                             <a href="${url}">
        //                             <div class="ff-primary product-title">${result.data.product.title}</div>
        //                             </a>
        //                             <div class="ff-primary product-price">$${result.data.product.priceRange.minVariantPrice.amount}</div>
        //                             <a href="#" class="remove" data-product-id="${result.data.product.id.replace("gid://shopify/Product/", "")}">
        //                             <i aria-hidden="true" class="icon-x-circle"></i>
        //                             <span class="hidden">Remove</span>
        //                             </a>
        //                           </div>`;
        // popupWishlistHtml = `${popupWishlistHtml}${productItemHtml}`;
      }
      const wishlistPopup = document.querySelector("#popup-wishlist");
      if (wishlistPopup && wishlistPopup.classList.contains("shown")) {
        displayWishlistItems();
      }
      // document.querySelector("#popup-wishlist .products-wrapper").innerHTML = popupWishlistHtml;
      // handleRemoveButtons();
    }
  };

  const loadSharedWishlist = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const wishlistInfo = urlParams.get("shared_wishlist");
    if (wishlistInfo) {
      const sharedWishlist = JSON.parse(atob(wishlistInfo));
      if (sharedWishlist?.items?.length) {
        var sharedWishlistHtml = "";
        for (const item of sharedWishlist.items) {
          const response = await fetch(
            "https://wishlist-test-220.myshopify.com/api/2024-01/graphql.json",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token":
                  "4db011664ff37eff23fa26d405bef52a",
              },
              body: JSON.stringify({
                query: `query productDetails @inContext(language: ${shopLocale.toUpperCase()}) {
              product(id: "gid://shopify/Product/${item}") {
                id
                title
                handle
                featuredImage {
                  url
                }
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
              }
            }`,
              }),
            }
          );

          const result = await response.json();

          console.log(result);

          const url = `${
            langPrimary === "true" ? "" : `/${shopLocale}`
          }/products/${result.data.product.handle}`;
          let priceInDollar = parseFloat(
            result.data.product.priceRange.minVariantPrice.amount
          );
          let price = Shopify.formatMoney(priceInDollar * 100);
          console.log("yyyyyyyy");
          const productItemHtml = `<div class="product-wishlist-item">
                                    <a href="${url}">
                                    <picture class="product-image img-multiply-bg">
                                      <img src="${result.data.product.featuredImage.url}" alt="product image">
                                    </picture>
                                    </a>
                                    <a href="${url}">
                                    <div class="ff-primary product-title">${result.data.product.title}</div>
                                    </a>
                                    <div class="ff-primary product-price">${price}</div>
                                  </div>`;
          sharedWishlistHtml = `${sharedWishlistHtml}${productItemHtml}`;
        }
        document.querySelector("#shared-wishlist .products-wrapper").innerHTML =
          sharedWishlistHtml;
        document.querySelector(
          ".shared-wishlist-title"
        ).innerHTML = `${sharedWishlist.name}'s wishlist`;
        document.querySelector("#shared-wishlist").classList.add("shown");
      }
    }
  };

  showWishlistButtons();
  loadWishlist();
  handlePopupClose();
  loadSharedWishlist();
})();
