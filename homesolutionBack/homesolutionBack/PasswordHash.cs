﻿using System.Security.Cryptography;
using System.Text;

namespace homesolutionBack
{
    public class PasswordHash
    {
        public static string Hash(string password)
        {
            byte[] inputBytes = Encoding.UTF8.GetBytes(password);
            byte[] inputHash = SHA256.HashData(inputBytes);
            return Encoding.UTF8.GetString(inputHash);
        }
    }
}
