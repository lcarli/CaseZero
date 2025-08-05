namespace CaseZero.Core.Enums;

public enum UserRole
{
    Detective = 1,
    Administrator = 2,
    Supervisor = 3,
    Analyst = 4,
    Guest = 5
}

public enum UserStatus
{
    Active = 1,
    Inactive = 2,
    Suspended = 3,
    PendingActivation = 4
}

public enum SessionStatus
{
    Active = 1,
    Paused = 2,
    Completed = 3,
    Abandoned = 4,
    TimeExpired = 5
}

public enum AccusationStatus
{
    Submitted = 1,
    UnderReview = 2,
    Correct = 3,
    Incorrect = 4,
    PartiallyCorrect = 5
}

public enum Language
{
    Portuguese = 1,
    English = 2,
    French = 3,
    Spanish = 4
}
