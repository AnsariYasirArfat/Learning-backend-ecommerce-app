import Prodouct from "../Models/product.schema.js"
import Coupon from "../Models/coupon.schema.js"
import Order from "../Models/order.schema.js"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../utils/CustomError.js"
import razorpay from "../config/razorpay.config.js"

export const generateRazorpayOrderId = asyncHandler(async (req, res) => {
    const { prodoucts, couponCode } = req.body

    if (!prodoucts || product.lenght === 0) {
        throw new CustomError("No product found", 400)
    }

    let totalAmount = 0;
    let discountAmount = 0;

    // Do product calculation based on DB  calls
    let productPriceCalc = Promise.all(
        prodoucts.map(async (product) => {
            const { prodouctId, count } = product;
            const productFromDB = await Prodouct.findById(prodouctId)
            if (!productFromDB) {
                throw new CustomError("No Product found", 400)
            }
            if (productFromDB.stock < count) {
                return res.status(400).json({
                    error: "Product quantity not in stock"
                })
            }
            totalAmount += productFromDB.price * count
        })
    )


    await productPriceCalc;

    // check for coupon discount, if available
    const couponCodeavailabe = await Coupon.findOne({ code: couponCode })
    if (!couponCodeavailabe) {
        throw new CustomError("Invalid coupon", 400)
    }
    if (couponCodeavailabe.active) {
        totalAmount = totalAmount - couponCodeavailabe.discount;
    } else {
        throw new CustomError("Coupon is not active", 400)
    }

    const options = {
        amoutn: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}`
    }


    const order = await razorpay.orders.create(options)
    if (!order) {
        throw new CustomError("Unable to generate the order", 400)
    }
    res.status(200).json({
        success: true,
        message: "razorpay order id generated successfully",
        order
    })
})


// Todo: add order in database and update product stock

export const generateOrder = asyncHandler(async (req, res) => {
    //add more fields below
    const { transactionId, products, coupon } = req.body
})

//Todo: get only my orders
export const getMyOrders = asyncHandler(async (req, res) => {
    //
})

//Todo: get all my orders: Admin
export const getAllOrders = asyncHandler(async (req, res) => {
    //
})

//Todo: update order Status: Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
    //
})