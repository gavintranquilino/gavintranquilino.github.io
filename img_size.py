from PIL import Image
import os

def get_dimensions(image):
    while True:
        try:
            length = int(input("Enter the horizontal (X-axis) distance (in pixels): "))
            width = int(input("Enter the vertical (Y-axis) distance (in pixels): "))
            return length, width
        except ValueError:
            print("Invalid input. Please enter valid integers for the horizontal and vertical distances.")

def suggest_new_size(image):
    current_width, current_height = image.width, image.height
    suggested_width = current_width
    suggested_height = current_height

    # Calculate the divisor for reducing both dimensions
    divisor = max(1, max(current_width, current_height) // 500)

    while suggested_width > 500 or suggested_height > 500:
        suggested_width = current_width // divisor
        suggested_height = current_height // divisor
        divisor += 1

    return suggested_width, suggested_height

def resize_images(input_dir, size_range):
    """Resize Images in Place"""

    for filename in os.listdir(input_dir):
        if filename.endswith(".png"):
            input_path = os.path.join(input_dir, filename)
            image = Image.open(input_path)
            
            if image.width == image.height:  # If the image is square
                target_size = (size_range, size_range)
            else:  # If the image is not square, suggest a new size
                original_width, original_height = image.width, image.height
                print(f"Image '{filename}' is not square.")
                print(f"Original Dimensions: {original_width} (X dist) x {original_height} (Y dist)")
                suggested_width, suggested_height = suggest_new_size(image)
                print(f"Suggested Size: {suggested_width} (X dist) x {suggested_height} (Y dist)")
                change_size = input("Do you want to change the image size (Y/N)? ").strip().lower()
                if change_size == 'n':
                    target_size = (image.width, image.height)  # Keep the original size
                else:
                    length, width = get_dimensions(image)
                    target_size = (length, width)

            resized_image = image.resize(target_size, Image.LANCZOS)  # Use LANCZOS resampling for high quality
            resized_image.save(input_path)
            
            print(f"Processed: {filename} - New Size: {target_size[0]} (X dist) x {target_size[1]} (Y dist)")

if __name__ == "__main__":
    input_directory = "img"
    size_range = 500
    resize_images(input_directory, size_range)
