from pydantic import BaseModel


class TrainConfig(BaseModel):

    n_estimators: int = 200
    max_depth: int = 10
    test_size: float = 0.2
    random_state: int = 42