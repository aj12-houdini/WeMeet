const  User = require("../models/User");

class UserService {
    async follow(userId, targetUserId){
        await this.#updateFollow("$push", userId,targetUserId);

    }

    async unfollow(userId, targetUserId){
        await this.#updateFollow("$pull", userId,targetUserId)
    }

    async #updateFollow(operation, userId,targetUserId){
        await User.findByIdAndUpdate(userId, {[operation]: {following: targetUserId}})
        await User.findByIdAndUpdate(targetUserId, { [operation]: { followers: userId } }) 

    }
}

module.exports = new UserService()