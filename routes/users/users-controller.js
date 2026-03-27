const User = require("./users-model");

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error
    }
}

const getUserById = async (userId) => {
    try {
       const user = await User.findById(userId);

       if(!user) {
        throw Error ("User Not Found!")
       }

       return user
    } catch (error) {
        throw error
    }
}

const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            userData,
            { new: true }
        )

        if(!updatedUser){
            throw Error ("User Not Found!")
        }

        return updatedUser
    } catch (error) {
        throw error 
    }
}

const createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser
    } catch (error) {
        throw error
    }
}

const deleteUser = async (userId) => {
    try {
        const UserToDelete = await User.findByIdAndDelete(userId);

        if(!UserToDelete){
            throw Error ("User Not Found!")
        }
        return UserToDelete
    } catch (error) {
        throw error
    }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };