package org.example.automentor.enums;

public enum RoadSignCategory {
    ADDITIONAL_INFORMATION_SIGNS("Əlavə məlumat nişanları (Lövhəciklər)"),
    INFORMATIVE_INDICATIVE_SIGNS("Məlumatverici-göstərici nişanlar"),
    MANDATORY_DIRECTION_SIGNS("Məcburi hərəkət istiqaməti nişanları"),
    PRIORITY_SIGNS("Üstünlük nişanları"),
    PROHIBITION_SIGNS("Qadağan nişanları"),
    SERVICE_SIGNS("Servis nişanları"),
    WARNING_SIGNS("Xəbərdarlıq nişanları");

    private final String displayName;

    RoadSignCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}