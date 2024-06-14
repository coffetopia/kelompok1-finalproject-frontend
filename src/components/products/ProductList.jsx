/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import tahuGejrot from "../../assets/tahuGejrot.png";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { handleDeleteProduct } from "./handleDelete";
import { useState } from "react";

export default function ProductList({ products, setProducts, isAdmin }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fungsi untuk menangani penambahan item ke keranjang
  const handleOrderClick = (product) => {
    if (!localStorage.getItem("username")) {
      // Menampilkan alert jika user belum login
      Swal.fire({
        title: "Silahkan sign in untuk memesan pesanan!",
        icon: "info",
        confirmButtonText: "Ok",
      });
    } else {
      // Menambahkan atau memperbarui produk di keranjang
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        // Perbarui jumlah produk jika sudah ada di keranjang
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        // Tambahkan produk baru ke keranjang
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      // Menampilkan alert sukses
      Swal.fire({
        title: "Product telah ditambahkan",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: cart });
  }

  return (
    <>
      <div className="flex sm:justify-start justify-center w-[100%]">
        <table className="table-auto">
          <tbody className="flex flex-col w-[100%]">
            {/* Loop melalui setiap produk dan tampilkan dalam bentuk baris */}
            {products?.map((product, index) => (
              <tr
                key={index}
                className="flex w-[100%] justify-start items-center"
              >
                <td className="basis-1/4">
                  {/* Menampilkan gambar produk */}
                  <img
                    src={tahuGejrot}
                    alt={product.name}
                    className="mx-2 w-[100px] sm:mx-10 my-5 sm:w-[130px]"
                  />
                </td>
                <td className="basis-1/4">
                  {/* Menampilkan nama produk */}
                  <p className="mx-5 sm:text-start text-center text-xs sm:text-base sm:mx-10 my-5">
                    {product.name}
                  </p>
                </td>
                <td className="basis-1/4">
                  {/* Menampilkan harga produk */}
                  <p className="mx-5 sm:text-start text-center text-xs sm:text-base sm:mx-10 my-5">
                    {product.price}
                  </p>
                </td>
                {isAdmin ? (
                  <td className="basis-1/4 flex justify-around p-4">
                    <div className="flex">
                      <button
                        onClick={() =>
                          handleDeleteProduct(product, setProducts)
                        }
                        className="bg-[#F41A1A] text-black w-7 h-7 rounded mr-2"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <Link to={`/updateproduct/${product.id}`}>
                        <button className="bg-[#3fff00] text-black w-7 h-7 rounded">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </Link>
                    </div>
                  </td>
                ) : (
                  <td className="basis-1/4">
                    {/* Tombol untuk menambahkan produk ke keranjang */}
                    <button
                      onClick={() => handleOrderClick(product)}
                      className="rectangle w-[40px] h-[40px] bg-secondary border border-[#747474] mx-4 sm:mx-12 my-5"
                    >
                      <p className="text-2xl text-white">+</p>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end pe-10 w-[100%] my-5">
        {/* Link ke halaman checkout */}
        <button
          onClick={handleCheckout}
          className="text-base sm:text-2xl font-bold bg-[#F4991A] border border-[#321313] w-[120px] h-[40px] flex justify-center items-center"
        >
          Next &gt;
        </button>
      </div>
    </>
  );
}
