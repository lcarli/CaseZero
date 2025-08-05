namespace CaseZero.Core.Enums;

public enum EvidenceType
{
    Document = 1,
    Photo = 2,
    Video = 3,
    Audio = 4,
    Physical = 5,
    Digital = 6,
    Statement = 7,
    Report = 8,
    Analysis = 9
}

public enum EvidenceCategory
{
    Scene = 1,
    Witness = 2,
    Victim = 3,
    Suspect = 4,
    Administrative = 5,
    Technical = 6,
    Legal = 7,
    Other = 99
}

public enum AnalysisStatus
{
    Pending = 1,
    InProgress = 2,
    Completed = 3,
    Failed = 4,
    Cancelled = 5
}

public enum AnalysisType
{
    Fingerprint = 1,
    DNA = 2,
    Ballistics = 3,
    Handwriting = 4,
    Digital = 5,
    Chemical = 6,
    Document = 7,
    PhotoAnalysis = 8,
    VideoAnalysis = 9,
    AudioAnalysis = 10
}
