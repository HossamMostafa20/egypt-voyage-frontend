export interface PredictionRequestI {
    entityId: string;
    interactionType: string;
}

export interface PredictionResponseI {
    prediction: number;
}
