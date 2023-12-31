using System.ComponentModel.DataAnnotations;

namespace Luden.Application.Models.Requests.User
{
    public class ValidateUserReq
    {
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}
