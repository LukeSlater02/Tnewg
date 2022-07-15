﻿namespace react_rpg.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string FirebaseUserId { get; set; }
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }
    }
}