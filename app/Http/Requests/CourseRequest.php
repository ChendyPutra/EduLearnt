<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'youtube_id' => 'nullable|string|max:50',
            'level' => 'nullable|in:SD,SMP,SMA',
            'category_id' => 'nullable|exists:categories,id',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Judul course wajib diisi',
            'title.max' => 'Judul course maksimal 255 karakter',
            'description.max' => 'Deskripsi maksimal 2000 karakter',
            'level.in' => 'Level harus SD, SMP, atau SMA',
        ];
    }

    protected function prepareForValidation()
    {
        // Sanitize input
        $this->merge([
            'title' => htmlspecialchars($this->title ?? '', ENT_QUOTES, 'UTF-8'),
            'description' => htmlspecialchars($this->description ?? '', ENT_QUOTES, 'UTF-8'),
        ]);
    }
}