import { TwitterApi } from 'twitter-api-v2';
import { TwitterApiRateLimitPlugin } from '@twitter-api-v2/plugin-rate-limit'
import * as dotenv from "dotenv";

dotenv.config();


export class Twitter {
    client: TwitterApi

    constructor() {
        const rateLimitPlugin = new TwitterApiRateLimitPlugin()
        this.client = new TwitterApi({
            appKey: process.env.TWITTER_CONSUMER_KEY,
            appSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
            accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        }, { plugins: [rateLimitPlugin] });
        console.log(`New Twitter client constructed`);
    }

    getUserByHandle = (screenName) => this.client.v1.user({ screen_name: screenName })

    follow = (screenName) => this.client.v1.createFriendship({ screen_name: screenName });

    tweet = (tweetText) => this.client.v1.tweet(tweetText);

    reply = (tweetText, tweetId) => this.client.v1.reply(
        tweetText,
        tweetId,
    );
}
