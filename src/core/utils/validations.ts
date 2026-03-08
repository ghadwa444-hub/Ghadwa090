/**
 * Form validation utilities for admin dashboard
 * Returns { valid: boolean, error?: string }
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// ============================================
// CHEF VALIDATIONS
// ============================================

export function validateChefName(name: string): ValidationResult {
  if (!name || !name.trim()) {
    return { valid: false, error: 'Chef name is required' };
  }
  if (name.trim().length < 2) {
    return { valid: false, error: 'Chef name must be at least 2 characters' };
  }
  if (name.trim().length > 50) {
    return { valid: false, error: 'Chef name must be less than 50 characters' };
  }
  return { valid: true };
}

export function validateChefSpecialty(specialty: string): ValidationResult {
  if (!specialty || !specialty.trim()) {
    return { valid: false, error: 'Specialty is required' };
  }
  if (specialty.trim().length < 2) {
    return { valid: false, error: 'Specialty must be at least 2 characters' };
  }
  if (specialty.trim().length > 100) {
    return { valid: false, error: 'Specialty must be less than 100 characters' };
  }
  return { valid: true };
}

export function validateChefBio(bio: string): ValidationResult {
  if (!bio || !bio.trim()) {
    return { valid: false, error: 'Bio is required' };
  }
  if (bio.trim().length < 10) {
    return { valid: false, error: 'Bio must be at least 10 characters' };
  }
  if (bio.trim().length > 500) {
    return { valid: false, error: 'Bio must be less than 500 characters' };
  }
  return { valid: true };
}

export function validateWorkingHours(
  workingHours: string
): ValidationResult {
  if (!workingHours || !workingHours.trim()) {
    return { valid: false, error: 'Working hours are required' };
  }
  // Format: "10:00 - 22:00" or similar
  const timeFormat = /^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}$/;
  if (!timeFormat.test(workingHours.trim())) {
    return {
      valid: false,
      error: 'Working hours format should be: HH:MM - HH:MM',
    };
  }
  return { valid: true };
}

export function validateDeliveryTime(deliveryTime: string): ValidationResult {
  if (!deliveryTime || !deliveryTime.trim()) {
    return { valid: false, error: 'Delivery time is required' };
  }
  // Format: "30 mins" or "1 hour" or similar
  const timeFormat = /^(\d+)\s+(min|mins|hour|hours)$/i;
  if (!timeFormat.test(deliveryTime.trim())) {
    return {
      valid: false,
      error: 'Delivery time format should be like: 30 mins or 1 hour',
    };
  }
  return { valid: true };
}

// ============================================
// PRODUCT/MEAL VALIDATIONS
// ============================================

export function validateProductName(name: string): ValidationResult {
  if (!name || !name.trim()) {
    return { valid: false, error: 'Product name is required' };
  }
  if (name.trim().length < 2) {
    return { valid: false, error: 'Product name must be at least 2 characters' };
  }
  if (name.trim().length > 100) {
    return { valid: false, error: 'Product name must be less than 100 characters' };
  }
  return { valid: true };
}

export function validateProductPrice(price: string | number): ValidationResult {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return { valid: false, error: 'Price must be a valid number' };
  }
  if (numPrice <= 0) {
    return { valid: false, error: 'Price must be greater than 0' };
  }
  if (numPrice > 999999) {
    return { valid: false, error: 'Price is too high' };
  }
  return { valid: true };
}

export function validateProductCategory(category: string): ValidationResult {
  // Accept both English and Arabic categories
  const validCategories = [
    'breakfast',
    'lunch',
    'dinner',
    'dessert',
    'drinks',
    'appetizer',
    'مشويات',
    'محاشي',
    'طواجن',
    'أكل شعبي',
    'حلويات',
    'معجنات',
    'مشروبات',
    'مقبلات'
  ];
  if (!category || !category.trim()) {
    return { valid: false, error: 'Category is required' };
  }
  if (!validCategories.includes(category)) {
    return {
      valid: false,
      error: `الفئة يجب أن تكون من القائمة المتاحة`,
    };
  }
  return { valid: true };
}

export function validateProductDescription(
  description: string
): ValidationResult {
  // Description is optional - if empty, it's valid
  if (!description || !description.trim()) {
    return { valid: true };
  }
  // If provided, validate length
  if (description.trim().length < 5) {
    return {
      valid: false,
      error: 'Description must be at least 5 characters',
    };
  }
  if (description.trim().length > 500) {
    return {
      valid: false,
      error: 'Description must be less than 500 characters',
    };
  }
  return { valid: true };
}

// ============================================
// BOX VALIDATIONS
// ============================================

export function validateBoxName(name: string): ValidationResult {
  if (!name || !name.trim()) {
    return { valid: false, error: 'Box name is required' };
  }
  if (name.trim().length < 2) {
    return { valid: false, error: 'Box name must be at least 2 characters' };
  }
  if (name.trim().length > 100) {
    return { valid: false, error: 'Box name must be less than 100 characters' };
  }
  return { valid: true };
}

export function validateBoxPrice(price: string | number): ValidationResult {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return { valid: false, error: 'Price must be a valid number' };
  }
  if (numPrice <= 0) {
    return { valid: false, error: 'Price must be greater than 0' };
  }
  return { valid: true };
}

export function validateBoxItems(items: any[]): ValidationResult {
  if (!items || items.length === 0) {
    return { valid: false, error: 'Box must contain at least one item' };
  }
  return { valid: true };
}

// ============================================
// OFFER VALIDATIONS
// ============================================

export function validateOfferTitle(title: string): ValidationResult {
  if (!title || !title.trim()) {
    return { valid: false, error: 'Offer title is required' };
  }
  if (title.trim().length < 3) {
    return { valid: false, error: 'Offer title must be at least 3 characters' };
  }
  if (title.trim().length > 100) {
    return { valid: false, error: 'Offer title must be less than 100 characters' };
  }
  return { valid: true };
}

export function validateOfferDiscount(discount: string | number): ValidationResult {
  const numDiscount = typeof discount === 'string' ? parseFloat(discount) : discount;

  if (isNaN(numDiscount)) {
    return { valid: false, error: 'Discount must be a valid number' };
  }
  if (numDiscount <= 0 || numDiscount > 100) {
    return { valid: false, error: 'Discount must be between 0 and 100' };
  }
  return { valid: true };
}

export function validateOfferPrice(price: string | number): ValidationResult {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return { valid: false, error: 'Price must be a valid number' };
  }
  if (numPrice <= 0) {
    return { valid: false, error: 'Price must be greater than 0' };
  }
  return { valid: true };
}

export function validateOfferExpiryDate(expiryDate: string): ValidationResult {
  if (!expiryDate || !expiryDate.trim()) {
    return { valid: false, error: 'Expiry date is required' };
  }

  const date = new Date(expiryDate);
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date format' };
  }

  if (date < new Date()) {
    return { valid: false, error: 'Expiry date must be in the future' };
  }

  return { valid: true };
}

// ============================================
// PROMO CODE VALIDATIONS
// ============================================

export function validatePromoCode(code: string): ValidationResult {
  if (!code || !code.trim()) {
    return { valid: false, error: 'Promo code is required' };
  }

  const codeFormat = /^[A-Z0-9]{3,20}$/;
  if (!codeFormat.test(code.trim().toUpperCase())) {
    return {
      valid: false,
      error: 'Promo code must be 3-20 alphanumeric characters (uppercase)',
    };
  }

  return { valid: true };
}

export function validatePromoValue(value: string | number): ValidationResult {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return { valid: false, error: 'Value must be a valid number' };
  }
  if (numValue <= 0) {
    return { valid: false, error: 'Discount value must be greater than 0' };
  }
  if (numValue > 100) {
    return { valid: false, error: 'Discount value cannot exceed 100' };
  }

  return { valid: true };
}

export function validatePromoExpiryDate(
  expiryDate: string | null | undefined
): ValidationResult {
  // Expiry date is optional for promo codes
  if (!expiryDate) {
    return { valid: true };
  }

  const date = new Date(expiryDate);
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date format' };
  }

  if (date < new Date()) {
    return { valid: false, error: 'Expiry date must be in the future' };
  }

  return { valid: true };
}

// ============================================
// ORDER VALIDATIONS
// ============================================

export function validateOrderStatus(status: string): ValidationResult {
  // Match the database CHECK constraint: pending, confirmed, preparing, out_for_delivery, delivered, cancelled
  const validStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

  if (!status || !status.trim()) {
    return { valid: false, error: 'Order status is required' };
  }

  if (!validStatuses.includes(status.toLowerCase())) {
    return {
      valid: false,
      error: `Status must be one of: ${validStatuses.join(', ')}`,
    };
  }

  return { valid: true };
}

// ============================================
// CONTACT SETTINGS VALIDATIONS
// ============================================

export function validateEmail(email: string): ValidationResult {
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email is required' };
  }

  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailFormat.test(email.trim())) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
}

export function validatePhoneNumber(phone: string): ValidationResult {
  if (!phone || !phone.trim()) {
    return { valid: false, error: 'Phone number is required' };
  }

  const phoneFormat = /^[+]?[\d\s\-()]{7,}$/;
  if (!phoneFormat.test(phone.trim())) {
    return { valid: false, error: 'Invalid phone number format' };
  }

  return { valid: true };
}

export function validateAddress(address: string): ValidationResult {
  if (!address || !address.trim()) {
    return { valid: false, error: 'Address is required' };
  }

  if (address.trim().length < 5) {
    return { valid: false, error: 'Address must be at least 5 characters' };
  }

  if (address.trim().length > 200) {
    return { valid: false, error: 'Address must be less than 200 characters' };
  }

  return { valid: true };
}

// ============================================
// BATCH VALIDATION (Check all fields at once)
// ============================================

export function validateChefForm(chefData: {
  name: string;
  specialty: string;
  bio: string;
  workingHours: string;
  deliveryTime: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const nameValidation = validateChefName(chefData.name);
  if (!nameValidation.valid) errors.name = nameValidation.error!;

  const specialtyValidation = validateChefSpecialty(chefData.specialty);
  if (!specialtyValidation.valid)
    errors.specialty = specialtyValidation.error!;

  const bioValidation = validateChefBio(chefData.bio);
  if (!bioValidation.valid) errors.bio = bioValidation.error!;

  const hoursValidation = validateWorkingHours(chefData.workingHours);
  if (!hoursValidation.valid)
    errors.workingHours = hoursValidation.error!;

  const deliveryValidation = validateDeliveryTime(chefData.deliveryTime);
  if (!deliveryValidation.valid)
    errors.deliveryTime = deliveryValidation.error!;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateProductForm(productData: {
  name: string;
  price: string | number;
  category: string;
  description: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const nameValidation = validateProductName(productData.name);
  if (!nameValidation.valid) errors.name = nameValidation.error!;

  const priceValidation = validateProductPrice(productData.price);
  if (!priceValidation.valid) errors.price = priceValidation.error!;

  const categoryValidation = validateProductCategory(productData.category);
  if (!categoryValidation.valid)
    errors.category = categoryValidation.error!;

  // Description is optional, only validate if provided
  if (productData.description && productData.description.trim()) {
    const descriptionValidation = validateProductDescription(
      productData.description
    );
    if (!descriptionValidation.valid)
      errors.description = descriptionValidation.error!;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateOfferForm(offerData: {
  title: string;
  discount: string | number;
  price: string | number;
  expiryDate: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const titleValidation = validateOfferTitle(offerData.title);
  if (!titleValidation.valid) errors.title = titleValidation.error!;

  const discountValidation = validateOfferDiscount(offerData.discount);
  if (!discountValidation.valid)
    errors.discount = discountValidation.error!;

  const priceValidation = validateOfferPrice(offerData.price);
  if (!priceValidation.valid) errors.price = priceValidation.error!;

  const expiryValidation = validateOfferExpiryDate(offerData.expiryDate);
  if (!expiryValidation.valid)
    errors.expiryDate = expiryValidation.error!;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
