namespace GymFit.Dtos
{
    public class ClassScheduleDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Time { get; set; }
        public string? Duration { get; set; }
        public int MaxParticipants { get; set; }
        public string? ImageUrl { get; set; }
        public List<string>? Days { get; set; }
        public int ParticipantsCount { get; set; }
    }
}
