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

    async findById(userId){
        return await User.findById(userId);
    }

    // Adds each user's name to the caller's list one by one, so a failure
    // halfway keeps the names found so far (same as the original loops).
    async collectUserNames(userIds, usernames){
        for (const userId of userIds) {
            const user = await this.findById(userId);
            usernames.push(user.username);
        }
    }

    async isFollowing(loggedInUserId, profileUserId){
        const loggedInUser = await this.findById(loggedInUserId);
        return loggedInUser.following.includes(profileUserId);
    }

    findByEmail(email){
        return User.findOne({ email: email });
    }

    async register(username, email, hashedPassword){
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        // Not awaited, exactly as in the original signup code
        newUser.save();
    }

    // Case-insensitive search on part of the username
    searchByUsername(searchTerm){
        return User.find({ username: { $regex: searchTerm, $options: "i" } });
    }

    addPostToUser(userId, postId){
        return User.findOneAndUpdate({ _id: userId }, { $push: { post: postId } });
    }

    async removePostFromUser(user, postId){
        const remainingPostIds = user.post;
        remainingPostIds.splice(remainingPostIds.indexOf(postId), 1);
        await User.updateOne({ _id: user._id }, { $set: { post: remainingPostIds } });
    }
}

module.exports = new UserService()