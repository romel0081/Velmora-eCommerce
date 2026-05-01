/**
 * MODERN RETAIL - E-Commerce Store
 * Alpine.js Application Logic
 */

function shopApp() {
    return {
        // State
        filter: 'all',
        showCart: false,
        showMobileMenu: false,
        showCheckoutSuccess: false,
        loading: true,
        cart: [],
        orderNumber: '',

        // Product Catalog
        products: [
            // HOME & KITCHEN
            {
                id: 1,
                name: 'Minimalist Ceramic Kettle',
                category: 'home',
                price: 85,
                image: 'https://images.unsplash.com/photo-1578500495846-b448d8f7a4ae?auto=format&fit=crop&q=80&w=500&h=667'
            },
            {
                id: 2,
                name: 'Professional Chef Knife',
                category: 'home',
                price: 150,
                image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=500&h=667'
            },
            {
                id: 3,
                name: 'Natural Bamboo Cutting Board',
                category: 'home',
                price: 45,
                image: 'https://images.unsplash.com/photo-1577003832033-a7b92f18cd45?auto=format&fit=crop&q=80&w=500&h=667'
            },

            // SPORTS
            {
                id: 4,
                name: 'Premium Yoga Mat Pro',
                category: 'sports',
                price: 120,
                image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=500&h=667'
            },
            {
                id: 5,
                name: 'Leather Boxing Gloves',
                category: 'sports',
                price: 95,
                image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?auto=format&fit=crop&q=80&w=500&h=667'
            },
            {
                id: 6,
                name: 'Carbon Fiber Running Shoes',
                category: 'sports',
                price: 180,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500&h=667'
            },

            // ARTS & CRAFTS
            {
                id: 7,
                name: 'Premium Oil Paint Set',
                category: 'arts',
                price: 75,
                image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500&h=667'
            },
            {
                id: 8,
                name: 'Ceramic Studio Kit',
                category: 'arts',
                price: 65,
                image: 'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=500&h=667'
            },
            {
                id: 9,
                name: 'Watercolor Artist Palette',
                category: 'arts',
                price: 50,
                image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?auto=format&fit=crop&q=80&w=500&h=667'
            }
        ],

        // ==========================================
        // INITIALIZATION
        // ==========================================
        init() {
            this.loading = false;
            this.loadCartFromStorage();
        },

        // ==========================================
        // PRODUCT FILTERING
        // ==========================================
        filteredProducts() {
            if (this.filter === 'all') {
                return this.products;
            }
            return this.products.filter(p => p.category === this.filter);
        },

        getCategoryLabel(category) {
            const labels = {
                home: 'Home & Kitchen',
                sports: 'Sports',
                arts: 'Arts & Crafts'
            };
            return labels[category] || category;
        },

        getCategoryTitle(category) {
            const titles = {
                home: 'Home & Kitchen',
                sports: 'Sports Gear',
                arts: 'Arts & Crafts'
            };
            return titles[category] || 'Shop All';
        },

        // ==========================================
        // CART MANAGEMENT
        // ==========================================
        addToCart(product) {
            // Add product to cart
            this.cart.push({ ...product });
            
            // Save to localStorage
            this.saveCartToStorage();
            
            // Show cart
            this.showCart = true;
            
            // Show notification (optional)
            this.showNotification(`${product.name} added to bag`);
        },

        removeFromCart(index) {
            // Get item before removing
            const item = this.cart[index];
            
            // Remove from cart
            this.cart.splice(index, 1);
            
            // Save to localStorage
            this.saveCartToStorage();
            
            // Close cart if empty
            if (this.cart.length === 0) {
                this.showCart = false;
            }
            
            // Show notification (optional)
            this.showNotification(`${item.name} removed from bag`);
        },

        cartTotal() {
            return this.cart.reduce((sum, item) => sum + item.price, 0);
        },

        // ==========================================
        // CHECKOUT
        // ==========================================
        checkout() {
            if (this.cart.length === 0) {
                return;
            }
            
            // Generate order number
            this.orderNumber = 'ORD' + Date.now().toString().slice(-8);
            
            // Close cart
            this.showCart = false;
            
            // Show success modal
            this.showCheckoutSuccess = true;
            
            // Clear cart
            this.cart = [];
            this.saveCartToStorage();
            
            // Log order (for debugging)
            console.log('Order placed:', this.orderNumber);
            
            // Auto-hide success modal after 3 seconds
            setTimeout(() => {
                this.showCheckoutSuccess = false;
            }, 3000);
            
            // Here you would typically:
            // 1. Send order data to your backend
            // 2. Integrate with Stripe/PayPal
            // 3. Send confirmation email
            // Example:
            // this.sendOrderToBackend({
            //     orderNumber: this.orderNumber,
            //     items: this.cart,
            //     total: this.cartTotal()
            // });
        },

        // ==========================================
        // STORAGE
        // ==========================================
        saveCartToStorage() {
            try {
                localStorage.setItem('modernRetailCart', JSON.stringify(this.cart));
            } catch (e) {
                console.error('Failed to save cart:', e);
            }
        },

        loadCartFromStorage() {
            try {
                const saved = localStorage.getItem('modernRetailCart');
                if (saved) {
                    this.cart = JSON.parse(saved);
                }
            } catch (e) {
                console.error('Failed to load cart:', e);
                this.cart = [];
            }
        },

        // ==========================================
        // UTILITIES
        // ==========================================
        showNotification(message) {
            // You can enhance this with a toast notification library
            // For now, just log to console
            console.log('📦', message);
            
            // Example with browser's native notification (optional):
            // if (Notification.permission === "granted") {
            //     new Notification("MODERN RETAIL", {
            //         body: message,
            //         icon: '/images/logo.png'
            //     });
            // }
        },

        scrollToProducts() {
            const productSection = document.getElementById('products');
            if (productSection) {
                productSection.scrollIntoView({ behavior: 'smooth' });
            }
            this.showMobileMenu = false;
        },

        // ==========================================
        // BACKEND INTEGRATION (Optional)
        // ========================================== 
        
        // Example: Send order to backend
        // async sendOrderToBackend(orderData) {
        //     try {
        //         const response = await fetch('/api/orders', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(orderData)
        //         });
        //         
        //         if (!response.ok) {
        //             throw new Error('Failed to place order');
        //         }
        //         
        //         const result = await response.json();
        //         console.log('Order saved:', result);
        //     } catch (error) {
        //         console.error('Error saving order:', error);
        //     }
        // }

        // Example: Stripe integration
        // async processPayment(amount) {
        //     try {
        //         const stripe = Stripe('YOUR_STRIPE_KEY');
        //         const { clientSecret } = await fetch('/api/create-payment-intent', {
        //             method: 'POST',
        //             body: JSON.stringify({ amount })
        //         }).then(r => r.json());
        //         
        //         const result = await stripe.confirmPayment({
        //             clientSecret,
        //             elements: this.elements,
        //             redirect: 'if_required'
        //         });
        //         
        //         if (result.error) {
        //             console.error(result.error.message);
        //         } else {
        //             this.checkout();
        //         }
        //     } catch (error) {
        //         console.error('Payment error:', error);
        //     }
        // }
    };
}