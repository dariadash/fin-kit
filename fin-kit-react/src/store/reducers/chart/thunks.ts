import { axios } from "@/http"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchData = createAsyncThunk(
    'chart/fetchAll',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('/tmp/test.php')
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка загрузки')
        }
    }
)