import ratelimit from "../config/upstash.js";


const rateLimit = async (req, res, next) => {
    try {
        // Use the client's IP address as the unique identifier for rate limiting
        const { success } = await ratelimit.limit(req.ip)

        if(!success){
            return res.status(429).json({message: "Too many requests, Please try again later"})
        }
        next()
    } catch (error) {
        console.log("Rate limit error", error);
        next(error)
    }
}

export default rateLimit;