const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");

const jwt = require("jsonwebtoken");

// Password strength validation function
function validatePasswordStrength(password) {
  const minLength = 8;
  const errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  // Calculate strength score
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.match(/[A-Z]/)) strength += 25;
  if (password.match(/[0-9]/)) strength += 25;
  if (password.match(/[^A-Za-z0-9]/)) strength += 25;

  // Only allow signup if password strength is 75% or higher (Good/Strong)
  const isStrongEnough = strength >= 75;

  return {
    isValid: errors.length === 0 ,
    errors: errors,
    strength: strength,
  };
}

const register = async (req, res) => {
  try {
    let { name, email, password ,username, avatar} = req.body;
    console.log(req.body);
    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Auto-generate username from email if not provided
    if (!username) {
      username = email.split("@")[0].toLowerCase();
      // Check if auto-generated username exists, add numbers if needed
      let baseUsername = name;
      let counter = 1;
      while (await userModel.findOne({ username: username.toLowerCase() })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      const strengthLevel =
        passwordValidation.strength <= 25
          ? "Very Weak"
          : passwordValidation.strength <= 50
          ? "Weak"
          : passwordValidation.strength <= 75
          ? "Moderate"
          : "Strong";

      return res.status(400).json({
        message: `Password is too weak (${strengthLevel}). Only "Good" or "Strong" passwords are allowed for account creation.`,
        errors: passwordValidation.errors,
        details:
          "Your password must include uppercase letters, lowercase letters, numbers, special characters, and be at least 8 characters long.",
        currentStrength: strengthLevel,
        requiredStrength: "Good or Strong",
        strengthScore: `${passwordValidation.strength}%`,
      });
    }

    // Check if user already exists by email
    const existingUserByEmail = await userModel.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Check if username already exists
    const existingUserByUsername = await userModel.findOne({
      username: username.toLowerCase(),
    });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Username must be 3-20 characters long and contain only letters, numbers, and underscores",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      name: name.trim(),
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      avatar: avatar || undefined, // Use default if not provided
    });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        isVerified: newUser.isVerified,
      },
    });
  } catch (error) {
    console.error(error);
    // if (error.code === 11000) {
    //   // Handle duplicate key error
    //   // const field = Object.keys(error.keyPattern)[0];
    //   return res.status(400).json({ message: `${field} already exists` });
    // }
    res.status(500).json({ message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await userModel.findOne({ email });
  console.log(userExist);
  if (!userExist) {
    res.status(404).send({ error: "User not found with this email" });
    return;
  }

  try {
    bcrypt.compare(password, userExist.password, (err, result) => {
      console.log(result);
      const token = jwt.sign(
        {
          userId: userExist._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
      );

      if (err) {
        console.error("Error during bcrypt comparison:", err);
        res.status(500).json({ error: "Error during bcrypt comparison" });
        return;
      }
      if (result) {
        res.status(200).send({
          token: token,
          email: userExist.email,
          user: {
            id: userExist._id,
            name: userExist.name,
            username: userExist.username,
            email: userExist.email,
            avatar: userExist.avatar,
            isVerified: userExist.isVerified,
          },
        });
      } else {
        res.status(401).send({ error: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get public user profile by username
// const getUserProfileByUsername = async (req, res) => {
//   try {
//     const { username } = req.params;
//     if (!username) {
//       return res.status(400).json({ message: "Username is required" });
//     }
//     const user = await userModel
//       .findOne({ username: username.toLowerCase() })
//       .select("-password -__v");
//     console.log("user found:", user);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({
//       id: user._id,
//       name: user.name,
//       username: user.username,
//       email: user.email, // Remove this if you want to hide email
//       avatar: user.avatar,
//       isVerified: user.isVerified,
//       createdAt: user.createdAt,
//       bio: user.bio || "",
//       // Add more public fields as needed
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching user data for ID:', userId);
    
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Format user data with fallbacks for missing fields
    const userData = {
      _id: user._id,
      name: user.name || null,
      email: user.email || null,
      address: user.address || null,
      addresses: user.addresses || [], // Include addresses array
      country: user.country || null,
      dob: user.dob || null,
      avatar: user.avatar || null,
      phoneNumber: user.phoneNumber || null,
      creditCard: user.creditCard || null,
      upiId: user.upiId || null,
      cardHolderName: user.cardHolderName || null,
      expiryDate: user.expiryDate || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    
    console.log('User data fetched successfully:', userData._id);
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, address, phoneNumber, country, dob, avatar, creditCard, upiId, cardHolderName, expiryDate } = req.body;
    
    console.log('Updating user data for ID:', userId);
    console.log('Update data received:', req.body);
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Current user data before update:', {
      name: user.name,
      address: user.address,
      phoneNumber: user.phoneNumber,
      country: user.country,
      creditCard: user.creditCard ? '****' + user.creditCard.slice(-4) : null,
      upiId: user.upiId
    });

    // Update only provided fields (including null/empty values to clear fields)
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (address !== undefined) updateData.address = address || null;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber || null;
    if (country !== undefined) updateData.country = country || null;
    if (dob !== undefined) updateData.dob = dob || null;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (creditCard !== undefined) updateData.creditCard = creditCard || null;
    if (upiId !== undefined) updateData.upiId = upiId || null;
    if (cardHolderName !== undefined) updateData.cardHolderName = cardHolderName || null;
    if (expiryDate !== undefined) updateData.expiryDate = expiryDate || null;

    console.log('Fields being updated:', updateData);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User data after update in DB:', {
      _id: updatedUser._id,
      name: updatedUser.name,
      address: updatedUser.address,
      phoneNumber: updatedUser.phoneNumber,
      country: updatedUser.country
    });

    // Format updated user data
    const userData = {
      _id: updatedUser._id,
      name: updatedUser.name || null,
      email: updatedUser.email || null,
      address: updatedUser.address || null,
      addresses: updatedUser.addresses || [], // Include addresses array
      country: updatedUser.country || null,
      dob: updatedUser.dob || null,
      avatar: updatedUser.avatar || null,
      phoneNumber: updatedUser.phoneNumber || null,
      creditCard: updatedUser.creditCard || null,
      upiId: updatedUser.upiId || null,
      cardHolderName: updatedUser.cardHolderName || null,
      expiryDate: updatedUser.expiryDate || null,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

    console.log('User data updated successfully for ID:', userData._id);
    console.log('Final response data:', {
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      creditCard: userData.creditCard ? '****' + userData.creditCard.slice(-4) : null,
      upiId: userData.upiId
    });
    res.json(userData);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user data' });
  }
};

// Change user password
const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    console.log('Changing password for user ID:', userId);
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: 'Password does not meet requirements',
        errors: passwordValidation.errors
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await userModel.findByIdAndUpdate(userId, { password: hashedNewPassword });

    console.log('Password changed successfully for user:', userId);
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Failed to change password' });
  }
};

// Get all addresses for a user
const getUserAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await userModel.findById(userId).select('addresses');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user.addresses || []);
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
};

// Create new address
const createAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, mobile, address, city, state, zipCode, tag } = req.body;
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // If this is the first address, make it default
    const isDefault = user.addresses.length === 0;
    
    const newAddress = {
      name: name.trim(),
      mobile: mobile.trim(),
      address: address.trim(),
      city: city?.trim() || '',
      state: state?.trim() || '',
      zipCode: zipCode?.trim() || '',
      tag: tag || 'HOME',
      isDefault
    };
    
    user.addresses.push(newAddress);
    await user.save();
    
    res.status(201).json(user.addresses[user.addresses.length - 1]);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ error: 'Failed to create address' });
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { name, mobile, address, city, state, zipCode, tag, isDefault } = req.body;
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ error: 'Address not found' });
    }
    
    // Update address fields
    user.addresses[addressIndex].name = name?.trim() || user.addresses[addressIndex].name;
    user.addresses[addressIndex].mobile = mobile?.trim() || user.addresses[addressIndex].mobile;
    user.addresses[addressIndex].address = address?.trim() || user.addresses[addressIndex].address;
    user.addresses[addressIndex].city = city?.trim() || user.addresses[addressIndex].city;
    user.addresses[addressIndex].state = state?.trim() || user.addresses[addressIndex].state;
    user.addresses[addressIndex].zipCode = zipCode?.trim() || user.addresses[addressIndex].zipCode;
    user.addresses[addressIndex].tag = tag || user.addresses[addressIndex].tag;
    
    // Handle default address
    if (isDefault) {
      // Remove default from all other addresses
      user.addresses.forEach((addr, index) => {
        addr.isDefault = index === addressIndex;
      });
    }
    
    await user.save();
    res.json(user.addresses[addressIndex]);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Failed to update address' });
  }
};

// Delete address
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (user.addresses.length <= 1) {
      return res.status(400).json({ error: 'Cannot delete the only address' });
    }
    
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ error: 'Address not found' });
    }
    
    const wasDefault = user.addresses[addressIndex].isDefault;
    user.addresses.splice(addressIndex, 1);
    
    // If deleted address was default, make first address default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }
    
    await user.save();
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Failed to delete address' });
  }
};

module.exports = { 
  register, 
  userLogin, 
  getUserById, 
  updateUser, 
  changePassword,
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress
};
