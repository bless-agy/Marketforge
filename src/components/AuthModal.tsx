import React, { useState } from 'react';
import { X, Lock, Mail, Building } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(email || 'merchant@marketforge.io');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative">
        <div className="flex justify-between items-center border-b border-[#c6c6cd] pb-3">
          <h3 className="text-xl font-bold text-[#000000]">
            {isRegister ? 'Register Business' : 'Merchant & Buyer Login'}
          </h3>
          <button onClick={onClose} className="p-1 text-[#45464d] hover:text-[#000000]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-xs font-semibold text-[#45464d] block mb-1">Company / Organization</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d] w-4 h-4" />
                <input
                  required
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="MarketForge Enterprise"
                  className="w-full pl-9 pr-3 py-2 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-[#45464d] block mb-1">Business Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d] w-4 h-4" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#45464d] block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d] w-4 h-4" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#000000] text-white font-semibold text-sm rounded-lg hover:bg-[#000000]/90 transition-colors shadow-xs"
          >
            {isRegister ? 'Create Merchant Account' : 'Sign In to Portal'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#c6c6cd]">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-[#45464d] hover:text-[#000000] font-medium"
          >
            {isRegister
              ? 'Already have an account? Sign In'
              : 'Need a seller or corporate buyer account? Register here'}
          </button>
        </div>
      </div>
    </div>
  );
};
